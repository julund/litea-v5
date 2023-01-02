import { Link } from "~/components/link";
import Container from "../shared/container";

const questionsAndAnswers = [
    { question: "What is Litea?", answer: "Litea is a website analytics application that helps website owners and administrators understand how their site is being used and accessed by visitors." },
    { question: "How does Litea differ from other website analytics tools?", answer: "Litea is a lightweight tool that is free from cookies and fully compliant with GDPR, CCPA and PECR. It also includes a responsive dashboard that makes it easy for users to quickly analyze and understand their website's performance." },
    { question: "What information can I track with Litea?", answer: "With Litea, you can track a wide range of metrics, including the number of visitors to your site, the pages that are most frequently visited, the amount of time that users spend on your site, and the specific actions that users take while on your site. You can also see detailed information about the demographics of your audience, including their age, gender, and geographic location." },
    { question: "How do I get started with Litea?", answer: "To get started with Litea, you'll need to create an account. Once you've created an account, you can add your website to Litea and start tracking your site's performance." },
    { question: "Can I use Litea to track an unlimited number of sites?", answer: "Yes, Litea allows you to track an unlimited number of sites." },
    { question: "Does Litea provide data ownership?", answer: "Yes, with Litea you have 100% ownership of your data." },
    { question: "Does Litea include uptime monitoring?", answer: "Yes, Litea includes uptime monitoring to ensure that your websites are always available." },
    { question: "Does Litea require cookie banners?", answer: "No, Litea does not require any cookie banners." },
    { question: "Can I receive email reports with Litea?", answer: "Yes, Litea allows you to receive email reports with your website's performance data." },
    { question: "Does Litea provide forever data retention?", answer: "Yes, Litea offers forever data retention for your website's performance data." },
    { question: "Can I export data from Litea in CSV or JSON format?", answer: "Yes, Litea allows you to export your website's performance data in CSV or JSON format, and there is no limit to the number of exports you can perform." },
    { question: "Is Litea compliant with privacy laws?", answer: "Yes, Litea is compliant with GDPR, CCPA and PECR." },
    { question: "What is the infrastructure like for Litea?", answer: "Litea is built on enterprise-grade infrastructure, ensuring that it is reliable and can handle large amounts of data." },
];

const QAitem = ({ question, answer }: { question: string; answer: string }) => (
    <details className="flex gap-2 rounded-sm px-4 py-2 open:bg-base-100 text-base-800 group transition-all duration-500">
        <summary className="py-2 select-none cursor-pointer flex justify-center items-center">
            <span className="font-semibold grow">{question}</span>
            <span className="text-lg hidden group-open:inline">-</span>
            <span className="text-lg inline group-open:hidden">+</span>
        </summary>
        <p className="py-4">{answer}</p>
    </details>
);

const FAQ = () => {

    return (
        <section id="cta" className="bg-primary-100/50 text-primary-800 p-8 backdrop-saturate-4">
            <Container>
                <div className="divide-y">
                    <h2>Frequently asked questions</h2>
                    {questionsAndAnswers.map((qa) => (
                        <QAitem key={qa.question} {...qa} />
                    ))}
                </div>
            </Container>
        </section>
    );
};
export default FAQ;