
import {useState} from 'react';

import ReactPlayer from 'react-player'

interface props {
    link: string
}

export default function Youtube(p: props){
    return (
        <div className='h-[300px]'>
        <ReactPlayer url={p.link} width='100%' height='100%' />
        </div>
    )
}