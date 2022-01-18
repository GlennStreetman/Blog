import tailwinds from "../posts/Tailwind-Notes";
import nextJS from "../posts/Next-Notes";

interface post {
    id: string;
    title: string;
    date: string;
    type: string;
}

interface allPosts {
    [key: string]: post;
}

export const postsRegister: allPosts = {
    [tailwinds.head.id]: tailwinds.head,
    [nextJS.head.id]: nextJS.head,
};

export const postsComp = {
    [tailwinds.head.id]: tailwinds.body,
    [nextJS.head.id]: nextJS.body,
};

// import matter from 'gray-matter'

// const postsDirectory = path.join(process.cwd(), 'posts')

// export function getSortedPostsData() {
//   // Get file names under /posts
//   const fileNames = fs.readdirSync(postsDirectory)
//   const allPostsData = fileNames.map(fileName => {
//     // Remove ".md" from file name to get id
//     const id = fileName.replace(/\.md$/, '')

//     // Read markdown file as string
//     const fullPath = path.join(postsDirectory, fileName)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data
//     }
// //   })

// var myText = ...; // Input text
// var lines = myText.split("\n");
// var numLines = lines.length;
// var i;
// var currentSection;
// var sections = Array();
// var phrases = Array();

// // parse phrases
// for (i = 0; i < numLines; i++) {
//   var line = lines[i];
//   if (line.indexOf('@') == 1) {
//     // start of e.g. time section, handled in nex loop
//     break;
//   } else {
//     // phrase
//     phrase.push(line);
//   }
// }

// // parse sections
// for ( ; i < numLines; i++) {
//   var line = lines[i];
//   if (line.indexOf('@') == 1) {
//     // start of next section, handled in nex loop
//     currentSection = line;
//     sections[currentSection] = new Array();
//   } else {
//     // add section entry
//     sections[currentSection].push(line);
//   }
// }
