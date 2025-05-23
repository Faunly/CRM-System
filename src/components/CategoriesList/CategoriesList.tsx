import classes from './CategoriesList.module.css';
import { FC } from 'react';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import { CategoriesType } from '../../types/todolist';
import { FilterTypes } from '../../types/filter';

type CategoriesListProps = {
    isFetching: boolean;
    filter: FilterTypes;
    categories?: CategoriesType;
    fetchTasksByfilter: (filter: FilterTypes) => void;
};

const CategoriesList: FC<CategoriesListProps> = ({ isFetching, categories, filter, fetchTasksByfilter }) => {
    return (
        !isFetching &&
        categories && (
            <ul className={classes.categoriesList}>
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'Все', filterTitle: 'all' }}
                    amount={categories && Object.values(categories)[0]}
                    onChangeFilter={fetchTasksByfilter}
                />
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'В работе', filterTitle: 'inWork' }}
                    amount={Object.values(categories)[2]}
                    onChangeFilter={fetchTasksByfilter}
                />
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'Сделано', filterTitle: 'completed' }}
                    amount={Object.values(categories)[1]}
                    onChangeFilter={fetchTasksByfilter}
                />
            </ul>
        )
    );
};

export default CategoriesList;
