import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { postsRegister, postsComp } from '../registers/postRegister'

interface postFormat {
  id: string,
  content: string,
  title: string,
  type: string,
  date: string,
}

interface matterRet {
  content: string,
  data: any
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  // const fileNames: string[] = fs.readdirSync(postsDirectory)
  // const allPostsData: postFormat[] = fileNames.map(fileName => {
  //   // Remove ".md" from file name to get id
  //   const id = fileName.replace(/\.md$/, '').replace(/\.js$/, '')

  //   // Read markdown file as stringd
  //   const fullPath = path.join(postsDirectory, fileName)
  //   const fileContents = fs.readFileSync(fullPath, 'utf8')

  //   // Use gray-matter to parse the post metadata section
  //   const matterResult: matterRet = matter(fileContents)

  //   // Combine the data with the id
  //   return {
  //     id,
  //     ...matterResult.data
  //   }
  // })
  // Sort posts by date
  // return []

  return Object.values(postsRegister).sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  // const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return Object.values(postsRegister).map(register => {
    return {
      params: {
        id: register.id
      }
    }
  })
}

// export async function getPostData(id) {
//   // const fullPath = path.join(postsDirectory, `${id}.md`)
//   // const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   // const matterResult = matter(fileContents)
//   const thisPostComp = postsComp[id]


//   // Use remark to convert markdown into HTML string
//   // const processedContent = await remark()
//   //   .use(html)
//   //   .process(matterResult.content)
//   // const contentHtml = processedContent.toString()

//   // Combine the data with the id
//   return {
//     id,
//     thisPostComp,
//   }
// }




