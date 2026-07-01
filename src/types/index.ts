import { z } from 'astro:content'

// 1. Esquema base para imágenes individuales
const imageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number()
})

// 2. Tamaños de imágenes de WordPress de forma segura
const featuredImagesSchema = z.object({
  thumbnail: imageSchema,
  medium: imageSchema,
  "medium-large": imageSchema.optional(), 
  medium_large: imageSchema.optional(),   
  large: imageSchema.optional(),
  full: imageSchema
}).partial() 

// 3. Esquema Base para las respuestas de WordPress
export const BaseWPSchema = z.object({
  id: z.number(),
  slug: z.string(),
  
  title: z.object({
    rendered: z.string()
  }),
  
  content: z.object({
    rendered: z.string()
  }),
  
  featured_images: featuredImagesSchema.optional().nullable(),
  
  // Lo dejamos vacío aquí para que .extend() lo sobreescriba correctamente
  acf: z.object({}).passthrough() 
})

const gallerySchema = z.object({
  large: imageSchema,
  full: imageSchema,
})


export const GalleryPageSchema = BaseWPSchema.extend({
  // 🚀 .default([]) garantiza que 'gallery' siempre sea un array ejecutable en Astro
  gallery: z.array(gallerySchema).default([])
})

// Corrección de typo: prcessSchema -> processSchema
const processSchema = z.object({
  title: z.string(),
  description: z.string(),
  imagen: z.string().url().or(z.string()) // Por si viene la URL o el ID en texto
})

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string()
})

// Esquemas de Categorías
export const CategoriesSlugSchema = z.array(CategorySchema.pick({
  slug: true
}))
const CategoriesSchema = z.array(CategorySchema)
// 4. CORREGIDO: Mapeamos explícitamente las propiedades dinámicas de tu ACF
export const ProcessPageSchema = BaseWPSchema.extend({
  acf: z.object({
    subtitle: z.string(),
    
    // Definimos explícitamente cada proceso como opcional para que no rompa
    // si en WordPress solo llenaste 2 o 3 en lugar de los 5.
    process_1: processSchema.optional(),
    process_2: processSchema.optional(),
    process_3: processSchema.optional(),
    process_4: processSchema.optional(),
    process_5: processSchema.optional(),
  }).catchall(z.any()) // Permite cualquier otra propiedad extra de WordPress sin romper
})

// 5. Esquema de Entradas (Posts) y exportaciones se quedan igual
export const PostSchema = BaseWPSchema.omit({
  acf: true
}).extend({
  date: z.string(),
  category_details: CategoriesSchema
})


const MenuItemSchema = BaseWPSchema.pick({
  title: true,
  featured_images: true
}).extend({
  acf: z.object({
    description: z.string(),
  price: z.coerce.number()
  })
})

export const MenuItemsSchema =z.array(MenuItemSchema)

const MarkerSchema = z.object({
  label: z.string(),
  lat: z.number(),
  lng: z.number()
})

const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number(),
  markers: z.array(MarkerSchema)
})

export const ContactPageSchema = BaseWPSchema.extend({
  acf: z.object({
    subtitle: z.string()
  }).catchall(LocationSchema)
})
export const PostsSchema = z.array(PostSchema)

export type Post = z.infer<typeof PostSchema>
export type ProcessPage = z.infer<typeof ProcessPageSchema>

export type Gallery = z.infer<typeof gallerySchema>
export type FeaturedImages = z.infer<typeof featuredImagesSchema>
export type Location = z.infer<typeof LocationSchema>