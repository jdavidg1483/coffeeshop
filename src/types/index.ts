import { z } from 'astro:content'
import { string } from 'astro:schema'

export const BaseWPSchema = z.object({
  id: z.number(),
  
  // 1. CORRECCIÓN: 'title' es un objeto que contiene un string llamado 'rendered'
  title: z.object({
    rendered: z.string()
  }),
  
  // 2. CORRECCIÓN: 'content' también es un objeto con 'rendered'
  content: z.object({
    rendered: z.string()
  }),
  
  // 3. OPTIMIZACIÓN: Hacemos 'acf' opcional (.optional()) o tolerante a nulos (.nullable())
  // También corregí el typo de "subtile" a "subtitle" (revisa cómo lo tienes exactamente en WP)
  acf: z.object({
    subtitle: z.string().optional() 
  }).optional().nullable()
})