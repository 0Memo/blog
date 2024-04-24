import { useParams} from 'react-router-dom';

export default function BlogDetailPage(){

    const { idBlog, idUser } = useParams();
    console.log(idBlog);

    return(
        <>
            <h1>Blog Detail Page</h1>
            <h3><span>Post n° { idBlog }</span></h3>
            <h3><span>de l'utilisateur { idUser }</span></h3>
        </>
    )
}