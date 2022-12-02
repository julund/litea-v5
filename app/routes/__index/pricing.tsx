import Pricingslider from "~/components/pricingslider";
import { IconCheck } from "~/components/icons";
import Container from "~/layout/shared/container";

const ListItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <li className="flex items-center gap-2 my-2 list-none"><IconCheck size={18} className="stroke-2 text-primary-500" />{children}</li>
    )
};

export default function PricingPage() {
    return (
        <Container>
            <h1>Pricing</h1>
            <p className="py-4">
                Autem esse quia quis et quia. Qui est facilis consequuntur
                dolorem. Ipsam et magnam est quia ut et beatae. Cum dolores veritatis
                ut quaerat ut quo eligendi voluptas.
            </p>
            <div className="grid grid-cols-1 grid-rows-1 gap-8 py-4 md:grid-cols-2">
                <Pricingslider />
                <div>
                    <h2>All accounts include:</h2>
                    <ul>
                        <ListItem>Unlimited sites</ListItem>
                        <ListItem>100% Data ownership</ListItem>
                        <ListItem>Uptime monitoring</ListItem>
                        <ListItem>No cookie banners required</ListItem>
                        <ListItem>Email reports</ListItem>
                        <ListItem>Forever data retention</ListItem>
                        <ListItem>Unlimited CSV and JSON data exports</ListItem>
                        <ListItem>Privacy law compliance</ListItem>
                        <ListItem>Enterprise-grade infrastructure</ListItem>
                    </ul>
                </div>
            </div>
            <p className="text-sm text-base-600">
                All pricing is in USD and renews automatically unless cancelled.
            </p>
        </Container>
    );
};