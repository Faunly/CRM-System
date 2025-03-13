import classes from './CategoriesList.module.css'
import { FC } from 'react'
import CategoriesItem from '../CategoriesItem/CategoriesItem'
import { CategoriesType } from '../../types/todolist'
import { filterTypes } from '../../types/filter'

type CategoriesListProps = {
    isFetching: boolean
    filter: filterTypes
    categories?: CategoriesType
    fetchTasksByCategories: (filter: filterTypes) => void
}

const CategoriesList: FC<CategoriesListProps> = ({ isFetching, categories, filter, fetchTasksByCategories }) => {
    return (
        !isFetching &&
        categories && (
            <ul className={classes.categoriesList}>
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'Все', filterTitle: 'all' }}
                    amount={categories && Object.values(categories)[0]}
                    onChangeFilter={fetchTasksByCategories}
                />
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'В работе', filterTitle: 'inWork' }}
                    amount={Object.values(categories)[2]}
                    onChangeFilter={fetchTasksByCategories}
                />
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'Сделано', filterTitle: 'completed' }}
                    amount={Object.values(categories)[1]}
                    onChangeFilter={fetchTasksByCategories}
                />
            </ul>
        )
    )
}

export default CategoriesList
