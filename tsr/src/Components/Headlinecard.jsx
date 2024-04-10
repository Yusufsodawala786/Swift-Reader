import React, { useEffect, useState } from 'react'

import { Skeleton } from '@mui/material';
import '../styles/Headlinecard.css';
import ReactCardFlip from 'react-card-flip';
import * as htmlToImage from 'html-to-image';
export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mimeType = arr[0].match(/:(.*?);/)[1],
      decodedData = atob(arr[1]),
      lengthOfDecodedData = decodedData.length,
      u8array = new Uint8Array(lengthOfDecodedData);
    while (lengthOfDecodedData--) {
      u8array[lengthOfDecodedData] = decodedData.charCodeAt(lengthOfDecodedData);
    }
    return new File([u8array], filename, { type: mimeType });
  };

  const shareFile = (file, title, text) => {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          files: [file],
          title,
          text
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  };


export default function Headline({headline,imageURL,summary,contentURL}) {
    // const [newsHeadlines,setNewsHeadlines] = useState([]);
    const [isImage, setIsImage] = useState(false)
    const [isHeadline, setIsHeadline] = useState(false)
    const [isLink, setIsLink] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    const flip = () => {
        setIsFlipped(!isFlipped)
    }
    async function create(e){
        const shareCard = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling
        let share_card = document.createElement("div")
        share_card.classList.add("Headline-Box","share-card")
        let news_card = document.createElement("div")
        news_card.className="News-card"
        let image_box = document.createElement("div")
        image_box.className="image-box"
        let newsImg = document.createElement('img')
        newsImg.src = imageURL
        let news_headline = document.createElement("div")
        news_headline.className="news-Headline"
        let news_headline_text = document.createTextNode(headline)
        news_headline.appendChild(news_headline_text)
        let summary_box=document.createElement("div")
        summary_box.className="summary-box"
        let p = document.createElement("p")
        let summary_text = document.createTextNode(summary)
        p.appendChild(summary_text)

        share_card.appendChild(news_card)
        share_card.appendChild(summary_box)
        news_card.appendChild(image_box)
        image_box.appendChild(newsImg)
        news_card.appendChild(news_headline)
        summary_box.appendChild(p)
        document.getElementsByClassName("Box-container")[0].appendChild(share_card)

        await htmlToImage.toPng(share_card).then((dataUrl)=>{
            const file = dataURLtoFile(dataUrl, "news.png");
            shareFile(file, "Title", "Swift reader");
        })
        share_card.remove();
    }
    return (
    <>
        <ReactCardFlip containerClassName='Headline-Box' isFlipped={isFlipped} flipDirection='horizontal' >
        <div className='News-card'  onClick = {flip}>
        {
            !isImage?
            <>
                <div className='image-box'><img src={imageURL} alt="image" /></div>
            </>:
            <>
                <Skeleton  variant='rounded' width={30} height={30} animation="wave" className='image-box'/>
            </>
        }
        {
            !isHeadline?
            <>
                <div className="news-Headline" >{headline}</div>
            </>:
            <>
                <Skeleton  variant='rounded' width={200} height={40} animation="wave" className="news-Headline"/>
            </>
        } 
        {
            !isLink?
            <>
                <div className="card-url-box" ><a href={contentURL} className='a'>Read Detailed News</a>
                <button className='share-button' onClick={(e)=>{create(e)}}>Share</button>
                </div>
            </>:
            <>
                <Skeleton  variant='rounded' width={100} height={30} animation="wave" className="card-url-box"/>
            </>
        } 
        </div>
        <div  className='summary-box' onClick={flip} >
            <p>
                {summary}
            </p>
        </div>
        </ReactCardFlip>
    </>
    )
}
