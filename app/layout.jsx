import '@styles/globals.css';
import Nav from '@components/nav';
import Provider from '@components/provider';

export const metadata = {
    title: "Promptopia",
    description : "Discover AI prompts"
}

const Rootlayout = ({children}) => {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8'/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <meta name='theme-color' content='#000000'/>
                <meta name='description' content={metadata.description}/>
                <meta property='og:title' content={metadata.title}/>
                <meta property='og:description' content={metadata.description}/>
                <meta property='og:type' content='website'/>
                <meta name='twitter:card' content='summary_large_image'/>
                <meta name='twitter:title' content={metadata.title}/>
                <meta name='twitter:description' content={metadata.description}/>
                
                </head>
                <Provider>
            <body suppressHydrationWarning={true} >
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
            <Nav/>
                {children}
            </main>
            </body>
            </Provider>
        </html>
    )
}

export default Rootlayout