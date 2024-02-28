import React,{useState} from 'react'
import storageService from '../appwrite/storage'
import { Link } from 'react-router-dom'


function Postcard({
    $id,
    title="",
    featuredImage,


}) {
  const [url, seturl] = useState('')
  // console.log($id,title,featuredImage)
  storageService.previewFile(featuredImage).then(res=>seturl(res.href))
  // console.log(first)
  // console.log()
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-200 rounded-lg p-4 "  >
            <div className="w-4/5 pb-2 justify-center ">
                <img src={url} alt={title}  className='w-fit h-fit rounded-lg'/>
            </div>
            <h1 className=' text-xl font-bold '>{title}</h1>
        </div>
    
    </Link>
  )
}

export default Postcard