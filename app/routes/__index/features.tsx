import { Card } from "~/components/card";
import { IconClock, IconDashboard, IconDeviceMobile, IconFilter, IconReport, IconSearch, IconStack, IconTool } from "~/components/icons";
import Container from "~/layout/shared/container";

export default function FeaturesPage() {
    return (
        <Container>
            <h1>Features</h1>
            <p className="text-base-600">Autem esse quia quis et quia. Qui est facilis consequuntur dolorem.</p>
            <p>Velit libero accusantium aspernatur nobis. Repudiandae ut consequuntur vel rerum ab illo dignissimos. Dolorem quo neque itaque quo temporibus. Et rerum quasi officia. Quod quis ut repellat delectus ipsam sint.</p>
            <p>Distinctio totam eveniet quia omnis. Itaque ea ab et quod doloremque sequi rerum cupiditate. Ab cumque est et molestias sunt. Pariatur deleniti ratione quo sint non laboriosam dolorem dolore.</p>
            <Card title="Accurate Traffic Tracking and Reporting" graphic={<IconReport size={128} strokeWidth={0.5} />}>
                Accurate tracking and reporting of website traffic is essential for any website analytics application. This includes the ability to see the number of visitors and pageviews over a specified period of time, providing valuable insights into the performance of a website.
            </Card>
            <Card title="Segmentation and Filtering of Traffic Data" graphic={<IconFilter size={128} strokeWidth={0.5} />}>
                The ability to segment and filter website traffic data is important for understanding the behavior of different types of visitors. This could include filtering by location, referral source, or other dimensions, allowing website owners to better understand the needs and preferences of their audience.
            </Card>
            <Card title="Integration with Other Tools and Platforms" graphic={<IconTool size={128} strokeWidth={0.5} />}>
                Integration with other tools and platforms, such as Google Analytics, is essential for providing a comprehensive view of website performance. This allows website owners to see all of their data in one place, making it easier to identify trends and opportunities for improvement.
            </Card>
            <Card title="Real-Time Reporting and Alerts" graphic={<IconClock size={128} strokeWidth={0.5} />}>
                Real-time reporting and alerts are important for quickly identifying any issues or opportunities with website performance. This could include alerts for sudden changes in traffic or alerts when certain thresholds are reached, such as a high number of pageviews or visitors.
            </Card>
            <Card title="Detailed Analysis of Referral Traffic and Search Engine Performance" graphic={<IconSearch size={128} strokeWidth={0.5} />}>
                Detailed analysis of referral traffic and search engine performance is essential for understanding how visitors are finding a website and what keywords they are using to do so. This could include information on keyword rankings and organic search traffic, helping website owners to optimize their content and improve their search engine visibility.
            </Card>
            <Card title="Support for Multiple Websites" graphic={<IconStack size={128} strokeWidth={0.5} />}>
                Support for multiple websites is important for website owners who manage multiple domains. A website analytics application with this feature would allow them to track and compare the performance of multiple websites in one place, making it easier to identify trends and opportunities for improvement across all of their domains.
            </Card>
            <Card title="Reports and Dashboards With Key Performance Metrics" graphic={<IconDashboard size={128} strokeWidth={0.5} />}>
                Reports and dashboards are essential for sharing key performance metrics with stakeholders. A website analytics application with this feature would allow website owners to create and share reports that highlight the most important metrics, making it easier to communicate the value of a website to others.
            </Card>
            <Card title="Support for Mobile and Web-Based Applications" graphic={<IconDeviceMobile size={128} strokeWidth={0.5} />}>
                Support for mobile and web-based applications is important for tracking performance across all platforms and devices. A website analytics application with this feature would allow website owners to see how their website is performing on both mobile and desktop devices, providing valuable insights into the user experience across different platforms.
            </Card>
        </Container>
    );
};

