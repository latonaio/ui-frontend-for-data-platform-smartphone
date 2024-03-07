import { clsx } from 'clsx';
import { SelectStyle } from './Select.style';
import {
  Select as SelectMaterial,
  MenuItem,
} from '@material-ui/core';
import { convertSelectDataStructure } from '@/helpers/common';

interface SelectProps {
  className?: string;
  isEditing: boolean;
  currentValue: any;
  select: {
    data: {[key: string]: any}[];
    label: string;
    value: string;
  };
  onChange?: (value: any) => void;
  isBlock?: boolean;
  isLabelMark?: boolean;
  isNoLabel?: boolean;
}

const createLabelName = (
  currentValue: any,
  selectList: any[],
) => {
  const findValue = selectList.find((select: {
    label: any;
    value: any;
  }) => {
    return currentValue === select.value;
  })

  if (findValue && findValue.showLabel) {
    return findValue.showLabel;
  }

  return findValue ? findValue.label : '';
};

export const Select = ({
                         className,
                         isEditing,
                         currentValue,
                         select,
                         onChange,
                         isBlock = false,
                         isLabelMark = false,
                         isNoLabel = false,
                       }: SelectProps) => {

  const selectList = convertSelectDataStructure(
    select.data,
    select.label,
    select.value,
    isLabelMark,
  );

  const labelName = createLabelName(currentValue, selectList);

  return (
    <SelectStyle className={clsx(
        '',
        className
      )}>
      <div className={`${!isEditing ? '' : 'hidden'}`}>
        {`${isNoLabel ? '' : currentValue}`} {labelName}
      </div>
      <div className={`selectMaterial ${!isEditing ? 'hidden' : ''}`}>
        {/* https://v4.mui.com/ja/components/selects/ v4.12.2 を参照 */}
        {
          currentValue &&
          <SelectMaterial
            labelId="label" id="select"
            autoWidth={true}
            value={currentValue}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
          >
            {selectList.map((item: any) => {
              return (
                <MenuItem value={item.value}>{isNoLabel ? ' ' : `${item.value} `}{item.label}</MenuItem>
              );
            })}
          </SelectMaterial>
        }
      </div>
    </SelectStyle>
  )
};
