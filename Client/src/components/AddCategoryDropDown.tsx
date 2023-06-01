import { Checkbox, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { FormikProps } from "formik";
import { useCategoryContext } from "../contexts/CategoryContext";
import { theme } from "../theme/theme";
import { ProductValues } from "./AddProductForm";

interface Props {
  formik: FormikProps<ProductValues>;
}

//** Component where you choose categories for a new product */
export default function AddCategoryDropDown(props: Props) {
  const { categories } = useCategoryContext();
  const { values, handleChange, handleBlur, touched, errors, setFieldTouched } = props.formik;

  const handleSelectCategory = (categoryID: string) => {
    const updatedCategories = values.categories.includes(categoryID)
      ? values.categories.filter((id) => id !== categoryID)
      : [...values.categories, categoryID];

    props.formik.setFieldValue("categories", updatedCategories);
    setFieldTouched("categories", true);
  };

  return (
    <FormControl sx={{ flex: 1 }}>
      <InputLabel id="categories" error={Boolean(touched.categories && errors.categories)}>
        Select categories
      </InputLabel>
      <Select
        labelId="categories"
        id="categories"
        multiple
        name="categories"
        label="Categories"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.categories && errors.categories)}
        value={values.categories}
        input={<OutlinedInput label="Select categories" error={Boolean(errors.categories)} />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select categories</em>;
          }
          const categoryNames = categories
            .filter((category) => selected.includes(category._id))
            .map((category) => category.name);
          return categoryNames.join(", ");
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            onMouseDown={() => {
              handleSelectCategory(category._id);
            }}
          >
            {category.name}
            <Checkbox
              id="checkbox"
              checked={values.categories.some((selectedId) => selectedId === category._id)}
              color="secondary"
            />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: theme.palette.error.main }}>
        <span>{(touched.categories && errors.categories)?.toString()}</span>
      </FormHelperText>
    </FormControl>
  );
}
