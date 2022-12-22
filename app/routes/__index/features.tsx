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
            Accurate tracking and reporting of website traffic helps provide insights into a website's performance. This includes the number of visitors and pageviews over a specific period.
            </Card>
            <Card title="Segmentation and Filtering of Traffic Data" graphic={<IconFilter size={128} strokeWidth={0.5} />}>
            Segmenting and filtering website traffic data helps website owners understand the behavior of different types of visitors. This includes filtering by location, referral source, or other dimensions to better understand their audience's needs and preferences.
            </Card>
            <Card title="Integration with Other Tools and Platforms" graphic={<IconTool size={128} strokeWidth={0.5} />}>
            Integration with tools like Google Analytics is essential for a comprehensive view of website performance. It allows website owners to see all their data in one place and identify trends and opportunities for improvement.
            </Card>
            <Card title="Real-Time Reporting and Alerts" graphic={<IconClock size={128} strokeWidth={0.5} />}>
                Real-time reporting and alerts help identify website performance issues or opportunities quickly. This includes alerts for sudden traffic changes and reaching thresholds like high pageviews or visitors.
            </Card>
            <Card title="Detailed Analysis of Referral Traffic and Search Engine Performance" graphic={<IconSearch size={128} strokeWidth={0.5} />}>
                Detailed analysis of referral traffic and search engine performance helps understand how visitors find a website and the keywords they use. This includes information on keyword rankings and organic search traffic, allowing website owners to optimize content and improve search engine visibility.
            </Card>
            <Card title="Support for Multiple Websites" graphic={<IconStack size={128} strokeWidth={0.5} />}>
                Support for multiple websites is important for website owners who manage several domains. This allows them to track and compare the performance of all their websites in one place, making it easier to identify trends and opportunities for improvement.
            </Card>
            <Card title="Reports and Dashboards With Key Performance Metrics" graphic={<IconDashboard size={128} strokeWidth={0.5} />}>
                Reports and dashboards are essential for sharing key performance metrics with stakeholders. A website analytics application with this feature allows website owners to create and share reports that highlight the most important metrics, making it easier to communicate a website's value.
            </Card>
            <Card title="Support for Mobile and Web-Based Applications" graphic={<IconDeviceMobile size={128} strokeWidth={0.5} />}>
                Support for mobile and web-based applications is important for tracking performance across all platforms and devices. A website analytics application with this feature allows website owners to see how their website performs on both mobile and desktop devices, providing insights into the user experience on different platforms.
            </Card>
        </Container>
    );
};

