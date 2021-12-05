/** Interfaz del `Post` */
export interface IPost {
  /** Id del post. */
  id: string;
  /** Titulo del post. */
  title: string;
  /** Contenido del post. */
  content: string;
  /** Path de la imagen */
  image_path: string;
  /** Id del creador */
  creator: string;
}
