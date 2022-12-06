import classes from './logistics-item.module.css';

interface LogisticsItemProps {
  icon: any;
  children: React.ReactNode;
}

function LogisticsItem({ icon: Icon, children }: LogisticsItemProps) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
