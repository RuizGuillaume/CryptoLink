import React from 'react'
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/env';

export default function LigneArticleHome(props) {

    const datePublication = new Date(props.article.publish_date)
    var options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
    return (
        <>
            <Link style={{ textDecoration: 'none' }} to={"/article"} state={props.article}>
                <img className="card-img-top" src={getImageUrl() + props.article.thumbnail}/>
                <div className="card-body">
                    <h2 className="card-title">{props.article.title}</h2>
                    {props.article.content === undefined || props.article.content == null || props.article.content.length === 0 ?
                        <></>
                        :
                        props.article.content.length > 125 ?
                        <>
                            <h4 className="card-text" dangerouslySetInnerHTML={{ __html: props.article.content.substring(0, 125) + '...' }}></h4>
                        </>
                        :

                        <>
                            <h4 className="card-text" dangerouslySetInnerHTML={{ __html: props.article.content }}></h4>
                        </>
                    }
                    <div className="metafooter">
                        <div className="wrapfooter">
                            <span className="meta-footer-thumb">
                            </span>
                            <span className="author-meta">
                                <span className="post-name">Publié par {props.article.pseudo}</span><br />
                                <span className="post-date">le {datePublication.toLocaleDateString("fr-FR", options)}</span><span className="dot"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
