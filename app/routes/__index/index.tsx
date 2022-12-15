import Container from "~/layout/shared/container";
import Intro from "~/layout/website/intro";

export default function Home() {
    return (
        <Container>
            <Intro/>
            <div className="py-2 prose">

                <p className="py-2">
                    Litea Analytics is a website analytics application that helps website owners and administrators understand how their site is being used and accessed by visitors. This application allows users to track a wide range of metrics for an unlimited number of sites, giving them 100% ownership of their data.
                </p>
                <p className="py-2">
                    The application also includes uptime monitoring to ensure that users' websites are always available, and does not require any cookie banners. Users can receive email reports and have access to forever data retention, as well as unlimited CSV and JSON data exports. Additionally, Litea Analytics is compliant with privacy laws and is built on enterprise-grade infrastructure.
                </p>
                <h3>GDPR</h3>
                <ul>
                    <li>Obtain clear and explicit consent from users before collecting and processing their personal data</li>
                    <li>Provide users with information about how their data will be used, including the specific purposes for processing their data and the length of time their data will be retained</li>
                    <li>Allow users to access, rectify, erase, and restrict the processing of their personal data</li>
                    <li>Implement appropriate technical and organizational measures to protect users' personal data from unauthorized access, disclosure, alteration, or destruction</li>
                    <li>Notify users and the relevant supervisory authority of any personal data breaches that may pose a risk to their rights and freedoms</li>
                    <li>Maintain a record of all data processing activities carried out by the app</li>
                    <li>Design the app with data protection principles in mind, and by default, only collect and process the minimum amount of personal data necessary to provide the service</li>
                </ul>

                <h3>Why Website Owners Should Use Website Analytics Apps</h3>

                <p>
                    Website analytics apps are essential tools for any website owner. These apps provide valuable insights into how visitors interact with your website, allowing you to make informed decisions about its design and content. By using a website analytics app, you can track important metrics such as the number of visitors to your site, the pages they visit, and how long they spend on each page. This information can help you understand what is working well on your site and what needs to be improved.
                </p>
                <p>
                    Another key benefit of website analytics apps is that they can help you identify potential issues with your site. For example, if you notice that visitors are spending a lot of time on a particular page but then quickly leaving your site, it could be a sign that there is a problem with that page. By using a website analytics app, you can quickly identify and fix these issues, improving the overall user experience on your site.
                </p>
                <p>
                    Ultimately, website analytics apps are essential for any website owner who wants to ensure that their site is performing at its best. By providing valuable insights into how visitors are interacting with your site, these apps can help you make informed decisions about its design and content, leading to a better overall user experience and potentially even more traffic and conversions for your business.
                </p>
            </div>
        </Container>
    );
}