import Button from "./Button.jsx";
import Icon from "./Icon.jsx";
import { vnd } from "../data/format.js";

export default function PlanCard({ plan: p }) {
  const featured = Boolean(p.badge);
  return (
    <article className={`plan${featured ? " plan--featured" : ""}`}>
      <div className="plan__head">
        <h3 className="plan__name">{p.name}</h3>
        {p.badge && <span className="plan__badge">{p.badge}</span>}
      </div>
      <div className="plan__price">
        <p className="plan__amount">{vnd(p.price)}</p>
        <p className="plan__unit">/ buổi chụp · Giá trọn gói</p>
      </div>
      <p className="plan__desc">{p.desc}</p>
      <hr className="rule" />
      <ul className="perks">
        {p.perks.map((perk) => (
          <li key={perk}><Icon name="check-plan" size={15} />{perk}</li>
        ))}
      </ul>
      <Button to={`/dat-lich?goi=${p.id}`} variant={featured ? "primary" : "outline"} icon={featured ? "arrow-light" : "arrow-dark"}>
        Chọn gói {p.name}
      </Button>
    </article>
  );
}
