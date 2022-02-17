/*
    @start
    id: CopyExcelChart
    project: CopyExcelChart
    description: An NPN Package used to copy charts between excel spreadsheets using NodeJS. Uses AdmZip to unpack Excel templates into source XML files. xml2js is then used to find and copy excel charts into destination files.
    repo: https://github.com/GlennStreetman/copyExcelChart
    languages: language-typescript,language-NPM
    @end
*/

import CodeBlock from "../components/codeBlock";

const body = function () {
    return (
        <div className="article">
            <h1>Copy-excel-chart is an {NPM} library that allows a developer to copy charts between excel files, using JavaScript.</h1>

            <h1>Development Story:</h1>

            <h2>The Goal:</h2>
            <p>
                One of my goals, when working on my project FinnDash, was to be able to push Finnhub.io API data into excel using a custom excel templating
                parser. Many of the Finnhub.io API routes return time series data that is best accompanies with charts. I reviewed a number of different
                libraries like {excelJS} and {sheetJS} but couldn’t find a free open source library that fit my needs. I could of course use Microsoft{" "}
                {javascriptAPI} but then I would need have Excel installed on my server.
            </p>
            <p>
                I decided to attempt my own solution. I knew that Excel files were just collections of XML documents so I could just unzip the target Excel
                document, copy the chart XML documents, and move them into the target Excel file. I would soon learn this was easier said than done, the fact
                that non one else had already done this was my first tip off.
            </p>
            <h2>Research:</h2>
            <p>
                Excel’s XML schema is complicated. The introductory document to Excel’s XML {schema} is 384 pages long and doesn’t have a lot of fluff, it’s
                dense. To make matters worse I don’t have a background working with XML data. No problem, I’ll just reverse engineer Excel’s chart schema. Armed
                with the desktop version of Excel, {winmerge}: An open source differencing tool to finds differences in folder structure and file content, and
                VS Code I got to work.
            </p>
            <p>
                I created and excel file and populated it with time series data, saved the file, then copied its source XML. I then took got to work comparing
                the differences using Winmerge.
            </p>
            <p>
                Excel’s XML structure uses a hierarchical set of documents. Each Workbook contains a workbook.xml file that references to all of the
                worksheet.xml documents as well named ranges used in the workbook. All charts reference a series of named ranges. -Each worksheet.xml has a
                related relationship file, if a worksheet contains a chart the worksheets rel file needs a relationship connecting it to a chart drawing. -Each
                chart drawing has its own relationship file that connects it to its color and style XML files -Each Drawing, chart, Color, and Style file needs
                to registered a master [Content_Types].xml file. -If worksheet name or the length/location of any time series data differs between source and
                target spreadsheets then any references to cell ranges need to be updated.
            </p>
            <p>
                As a result, copying a chart, from one Excel file to another, requires a minimum of copying one /drawing file, copying 3 /chart files,
                creating/updating _rel files in the /worksheet, /drawing, and /charts subdirectories, updating any cell references, and registering any new
                files to the [Content_Types].xml master file. Also, don’t forget to add all of your new cell reference ranges to the worbook.xml definedNames
                section. If one apostrophe is copied out of place or any XML file edits are made in the wrong order the file is probable corrupted and you might
                not be able to open your edited Excel file.
            </p>
            <h2>The Solution:</h2>
            <p>
                This is a bit complicated but breaking the problem down into small steps and testing along the way would get me to where I wanted to go. I got
                to work on writing a parser. I would need a way to extract Excel XML files so I added {admzip}, and I would need a way to read the XML files, so
                I included {xml2js}. The parser would open/read both the source and target files, copy all of the target file XML’s into a working directory,
                merge in the source XML chart files, update any cell references, and re-zip the working directory into a complete Excel .xlsx file.
            </p>
            <p>
                While writing the parser I of course ran into several problems. One of the largest is there are different chart schemas, and the exact method of
                copying/merging each schema is slightly different. There is a basic chart schema, simply named ‘chart’, and an extended chart schema, ‘chartEx’.
                I haven’t yet tested what goes on if a chart references pivot table data or ‘table’ data. Testing everything is a further problem because the
                parsers output can only be tested using an excel client, as far as I can tell.{" "}
            </p>
            <h2>Lessons Learned:</h2>
            <p>
                At the end of the day I have a working, but not thoroughly tested parser. Finnhub.io can copy charts from Excel templates into output Excel
                files but I don’t think I am going to take the time to validate that the solution is robust enough to be used in production quality code. Excel
                has dozens of chart types, with various configurations, and differing ways to go about defining source data. Testing each variance involves
                creating the chart in excel, creating an Excel file to copy the chart to, and running a test script which is very time consuming. If the Excel
                schema ever changes when a new version is release in all likelihood the entire process would need to refactored and retested. This task would be
                a lot of work for one person to accomplish.
            </p>
            <p>
                One take home from all of this, if you want to do any programmatic manipulation of Excel files, that extends beyond updating cell data, use one
                of Excel’s internal APIs. Microsoft has a ton of documentation and your developer experience will be a lot smoother. Only consider writing your
                own custom solution as a last resort. I will definitly look into running Excel in a virtual environment or docker before attempting a solution
                like this one again.
            </p>
        </div>
    );
};

export default body;

const javascriptAPI = (
    <a href="https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-charts" target="_blank">
        Excel JavaScript API
    </a>
);

const NPM = (
    <a href="https://www.npmjs.com/package/copy-excel-chart" target="_blank">
        NPM
    </a>
);

const excelJS = (
    <a
        href="https://www.npmjs.com/package/exceljs
    "
        target="_blank"
    >
        ExcelJS
    </a>
);

const sheetJS = (
    <a
        href="https://sheetjs.com/
    "
        target="_blank"
    >
        sheetJS
    </a>
);

const schema = (
    <a href="https://interoperability.blob.core.windows.net/files/MS-XLSX/%5bMS-XLSX%5d.pdf" target="_blank">
        schema
    </a>
);

const admzip = (
    <a href="https://www.npmjs.com/package/adm-zip" target="_blank">
        adm-zip
    </a>
);

const xml2js = (
    <a href="https://www.npmjs.com/package/xml2js" target="_blank">
        xml2js
    </a>
);
const winmerge = (
    <a href="https://winmerge.org/?lang=en" target="_blank">
        Winmerge
    </a>
);
