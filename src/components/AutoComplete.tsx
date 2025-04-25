import Select, {
  ActionMeta,
  components,
  OnChangeValue,
  OptionProps,
  StylesConfig,
} from "react-select";
import { FC, useState } from "react";
import { Button } from "./Buttons/Button";

export interface AutoCompleteOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly createButton?: {
    onClick: () => void;
    label: string;
  };
}

const styles: StylesConfig<AutoCompleteOption, true> = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values: readonly AutoCompleteOption[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const Option = (props: OptionProps<AutoCompleteOption>) => {
  console.log("Option", props);
  if (props.data.createButton) {
    return (
      <Button
        onClick={props.data.createButton.onClick}
        title={props.data.createButton.label}
      ></Button>
    );
  }
  return <components.Option {...props} />;
};

const filterOption = (
  candidate: { label: string; value: string; data: AutoCompleteOption },
  input: string
) => {
  console.log("filterOption", candidate, input);
  return true;
};

type Props = {
  options: AutoCompleteOption[];
  onChange?: (
    value: readonly AutoCompleteOption[],
    actionMeta: ActionMeta<AutoCompleteOption>
  ) => void;
  placeholder?: string;
  defaultValueIds?: string[];
};
export const AutoComplete: FC<Props> = ({
  options,
  onChange: onChange_,
  placeholder,
  defaultValueIds = [],
}) => {
  const defaultValues = options.filter((v) =>
    defaultValueIds.includes(v.value)
  );
  const [value, setValue] = useState<readonly AutoCompleteOption[]>(
    orderOptions(defaultValues)
  );

  const onChange = (
    newValue: OnChangeValue<AutoCompleteOption, true>,
    actionMeta: ActionMeta<AutoCompleteOption>
  ) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = options.filter((v) => v.isFixed);
        break;
    }

    setValue(orderOptions(newValue));
    onChange_?.(newValue, actionMeta);
  };

  return (
    <Select
      value={value}
      isMulti
      components={{ Option }}
      styles={styles}
      isClearable={value.some((v) => !v.isFixed)}
      name="colors"
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      filterOption={filterOption}
    />
  );
};
