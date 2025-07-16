import styles from './styles.module.css';

interface Props {
  item: string;
  value: any;
}

/**
 *
 * @param {Props} props
 */
export default function ItemAndValue(props: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.item}>{props.item}:</div>
      <div className={styles.value}>{props.value}</div>
    </div>
  );
}
