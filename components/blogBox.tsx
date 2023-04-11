import Image from "next/legacy/image";

export default function BlogBox(p){

    return (
        <div className='flex flex-inline h-fit w-full '>
            <div className='w-1/3 md:w-1/4 h-fit'></div>
            <div className='w-2/3 md:w-2/4 h-fit'><Image width={834} height={480} objectFit='fill' layout="responsive" src="/lighthouse.JPG" alt="lighthouse score" /></div>
            <div className='w-1/3 md:w-1/4 h-fit'></div>
        </div>
    )
}

