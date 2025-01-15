export interface ArticleInterface {
    id: string;
    // authorName: string;
    title: string;
    description: string;
    date: string;
    author: {
        name?: string | null,
        id?: string | null,
    }
}