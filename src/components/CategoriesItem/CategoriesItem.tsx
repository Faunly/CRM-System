import { FC } from 'react'
import classes from './CategoriesItem.module.css'

type CategoriesItemProps = {
    curFilter: string
    meta: { title: string; filterTitle: string }
    onChangeFilter: (filterTitle: string) => void
    amount: number
}

const CategoriesItem: FC<CategoriesItemProps> = ({ curFilter, meta, amount, onChangeFilter }) => {
    return (
        <li
            className={`${classes.categoriesItem} ${curFilter === meta.filterTitle && classes.selected}`}
            onClick={() => {
                onChangeFilter(meta.filterTitle)
            }}>
            {`${meta.title} (${amount})`}
        </li>
    )
}

export default CategoriesItem
