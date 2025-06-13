import { useField } from 'formik'
import './CustomInput.css'

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  const isFileInput = props.type === 'file'

  return (
    <>
      <label>{label}</label>
      <input
        {...props}
        {...(!isFileInput ? field : {})}
        className={meta.error && meta.touched ? 'input-error' : ''}
        onChange={(event) => {
          if (isFileInput) {
            props.onChange && props.onChange(event)
          } else {
            field.onChange(event)
          }
        }}
        onBlur={field.onBlur}
      />
      {meta.error && meta.touched && <p className="error">{meta.error}</p>}
    </>
  )
}

export default CustomInput
