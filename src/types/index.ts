import { z } from 'astro:content'

// 1. CORREGIDO: Se cambia 'with' por 'width'
const imageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number()
})

// 2. OPTIMIZACIÓN: Usamos .partial() para que si WordPress no generó 
// el tamaño 'large' (porque la imagen era chica), el esquema no rompa la web.
const featuredImagesSchema = z.object({
  thumbnail: imageSchema,
  medium: imageSchema,
  "medium-large": imageSchema.optional(), // Por si viene con guion medio en tu JSON
  medium_large: imageSchema.optional(),   // Por si viene con guion bajo
  large: imageSchema.optional(),
  full: imageSchema
}).partial() // Hace que todos los tamaños internos sean opcionales por seguridad, excepto los que decidas

export const BaseWPSchema = z.object({
  id: z.number(),
  
  title: z.object({
    rendered: z.string()
  }),
  
  content: z.object({
    rendered: z.string()
  }),
  
  // 3. PROTECCIÓN: La imagen destacada puede ser opcional (si una página no tiene foto)
  featured_images: featuredImagesSchema.optional().nullable(),

  acf: z.object({
  
  })


})

  const prcessSchema = z.object({
    title: z.string(),
    description: z.string(),
    imagen: z.string()
  })

  const CategorySchema = z.object({
     name: z.string(),
     slug: z.string()
  })

  const CategoriesSchema = z.array(CategorySchema)

  export const ProcessPageSchema = BaseWPSchema.extend({
    acf: z.object({
      subtitle: z.string()
    }).catchall(prcessSchema)
  })

  export const PostSchema =  BaseWPSchema.omit({
    acf:true
  }).extend({
    date: z.string(),
    category_details: CategoriesSchema
  })

  export const PostsSchema = z.array(PostSchema)

  export type Post = z.infer<typeof PostSchema>