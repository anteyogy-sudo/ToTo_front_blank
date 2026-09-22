import React from 'react';

interface ProductDescriptionProps {
    description: any;
    isRecipe?: boolean;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description, isRecipe }) => {
    // Разделы
    const groups = [
        {
            key: 'description',
            title: 'Описание товара',
            fields: [
                { key: 'atc', label: 'Код АТХ' },
                { key: 'isRecipe', label: 'Условия отпуска' },
                { key: 'indications', label: 'Показания к применению' },
                { key: 'mkb', label: 'МКБ-10' },
                { key: 'ptg', label: 'Характеристика' },
                { key: 'has_gmo', label: 'Наличие ГМО', render: (val: boolean) => (val ? 'Да' : 'Нет') },
                { key: 'baby_food', label: 'Детское питание', render: (val: boolean) => (val ? 'Да' : 'Нет') },
                { key: 'composition', label: 'Состав' },
                { key: 'physicochemical_properties', label: 'Физико-химические свойства' },
                { key: 'allergens', label: 'Аллергены' },
                { key: 'has_allergens', label: 'Содержит аллергены', render: (val: boolean) => (val ? 'Да' : 'Нет') },
                { key: 'application_area', label: 'Область применения' },
                { key: 'target_age', label: 'Целевая возрастная группа' },
                { key: 'manufacturer_name', label: 'Производитель' },
            ],
        },
        {
            key: 'pharmacological',
            title: 'Фармакологическое действие',
            fields: [
                { key: 'pharmacological_properties', label: 'Фармакологические свойства' },
                { key: 'pharmacokinetics', label: 'Фармакокинетика' },
            ],
        },
        {
            key: 'contraindications',
            title: 'Противопоказания',
            fields: [
                { key: 'contraindications', label: 'Противопоказания' },
                { key: 'pregnancy_use', label: 'Применение при беременности и кормлении грудью' },
                { key: 'child_use', label: 'Применение детьми' },
                { key: 'side_effect', label: 'Побочное действие' },
                { key: 'overdose', label: 'Передозировка' },
                { key: 'interaction_with_other_drugs', label: 'Взаимодействие с другими препаратами' },
            ],
        },
        {
            key: 'special',
            title: 'Особые указания',
            fields: [
                { key: 'specific_guidance', label: 'Особые указания' },
                { key: 'storage_conditions', label: 'Условия хранения' },
                { key: 'shelf_life', label: 'Срок годности' },
                { key: 'dosage_and_administration', label: 'Способ применения и дозы' },
                { key: 'recommendations_for_use', label: 'Рекомендации по применению' },
                { key: 'mode_of_application', label: 'Способ применения' },
                { key: 'impact_on_vehicle', label: 'Влияние на способность управлять транспортом' },
                { key: 'chronic_use', label: 'Применение при хронических заболеваниях' },
            ],
        },
    ];

    // Оставляем только те группы, у которых есть хотя бы одно непустое поле
    const availableGroups = groups
        .map(group => ({
            ...group,
            fields: group.fields.filter(field => {
                if (field.key === 'isRecipe') {
                    return isRecipe !== undefined;
                }
                const value = description?.[field.key];
                if (value == null) return false;
                if (typeof value === 'string' && !value.trim()) return false;
                return true;
            }),
        }))
        .filter(group => group.fields.length > 0);

    // Прокрутка к разделу
    const scrollToGroup = (key: string) => {
        const container = document.querySelector('.scrollbar-custom');
        const element = document.getElementById(`group-${key}`);

        if (container && element) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // Позиция раздела относительно контейнера с учётом текущей прокрутки
            const relativeTop = elementRect.top - containerRect.top + container.scrollTop;

            container.scrollTo({
                top: relativeTop - 80, // отступ сверху
                behavior: 'smooth'
            });
        }
    };

    if (availableGroups.length === 0) return null;

    return (
        <div className="w-full lg:py-4 py-1">
            <div className="flex flex-col lg:gap-3 gap-3 bg-white-500 rounded-[16px] p-4 break-words hyphens-auto">
                {/* Навигационное меню */}
                <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-4">
                    {availableGroups.map(group => (
                        <button
                            key={group.key}
                            onClick={() => scrollToGroup(group.key)}
                            className="text-xl font-medium text-black-100 hover:text-primary-blue transition-colors px-3 py-2 rounded-md"
                        >
                            <h2>{group.title}</h2>
                        </button>
                    ))}
                </div>

                {/* Группы с полями */}
                {availableGroups.map(group => (
                    <div key={group.key} id={`group-${group.key}`} className="flex flex-col gap-4 scroll-mt-24">
                        <h3 className="font-bold text-[24px] text-black-100 leading-[110%]">{group.title}</h3>
                        <div className="flex flex-col gap-3">
                            {group.fields.map(field => {
                                let content;
                                if (field.key === 'isRecipe') {
                                    content = isRecipe ? 'По рецепту' : 'Без рецепта';
                                } else {
                                    const value = description?.[field.key];
                                    if (value == null) return null;
                                    if (field.render) {
                                        content = field.render(value);
                                    } else if (typeof value === 'string') {
                                        content = value.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ));
                                    } else {
                                        content = String(value);
                                    }
                                }

                                return (
                                    <div key={field.key} className="flex flex-col gap-1">
                                        <p className="font-medium text-black-100 text-[20px] leading-[120%]">
                                            {field.label}
                                        </p>
                                        <div className="text-black-100 text-[18px] leading-[150%]">
                                            {content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDescription;