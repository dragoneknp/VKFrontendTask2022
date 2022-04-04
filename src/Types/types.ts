export interface Gif {
    id: string;
    url: string;
    title: string;
    image: Image;
}

export interface Image{
    height: string;
    width: string;
    url: string;
}

export interface Message{
    date: string;
    id: string;
    message: Image | string;
}