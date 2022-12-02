import Container from "~/layout/shared/container";

export default function Home() {
    return (
        <Container>
            <div className="grid items-center justify-center grid-cols-1 gap-4 text-center break-words md:grid-cols-3 md:gap-8 md:justify-items-start md:text-left">
                <div className="relative flex w-3 h-3 justify-self-center">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-primary-400 animate-ping"></span>
                    <span className="relative inline-flex w-3 h-3 rounded-full bg-primary-500"></span>
                </div>
                {/* <a.div style={wobble} className="max-w-xs col-span-1 justify-self-center min-w-min">
                <Image src="/stats.svg" alt="stats" width={350} height={350}/>
                </a.div> */}
                <div className="flex flex-col col-span-2">
                    <h1 className="my-2 text-4xl text-base-900 font-title">Lightweight & privacy-oriented website analytics</h1>
                    <div className="text-lg text-base-800">
                        Litea is a lightweight website analytics tool free from cookies and fully compliant with <abbr title="The General Data Protection Regulation 2016/679 (GDPR) is a regulation in EU law on data protection and privacy in the European Union and the European Economic Area. It also addresses the transfer of personal data outside the EU and EEA areas.">GDPR</abbr>, <abbr title="The California Consumer Privacy Act is a state statute intended to enhance privacy rights and consumer protection for residents of California, United States.">CCPA</abbr> and <abbr title="The Privacy and Electronic Communications Regulations (PECR) sit alongside the Data Protection Act and the UK GDPR. They give people specific privacy rights in relation to electronic communications.">PECR</abbr>. Stop scrolling through pages of reports and collecting useless personal data about your visitors. Our responsive dashboard will help you make business decisions quickly.
                    </div>
                    <div className="flex justify-center gap-4 my-4 text-xl md:justify-start">
                        <a className="button button-primary" href={"/"}>Learn more</a>
                        <a className="button button-ghost" href={"/"}>Live demo</a>
                    </div>
                </div>
            </div>
        </Container>
    );
}