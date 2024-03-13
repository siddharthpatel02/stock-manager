import "./statCard.scss";
const StatCard = ({
  backgroundColor,
  title,
  data,
  color,
}: {
  backgroundColor: string;
  title: string;
  data: number;
  color?: string;
}) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor, color: color ? color : "" }}
      className="stat-card"
    >
      <h1 className="stat-card-heading">{title}</h1>
      <h1 className="stat-card-figure">{data}</h1>
    </div>
  );
};

export default StatCard;
