import styles from "../styles/Input.module.css";

type InputProps = {
  placeholder: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  value: string;
};

export default function Input({
  placeholder,
  onChange,
  onBlur,
  value,
  ...rest
}: InputProps) {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      {...rest}
    />
  );
}
