interface SelectProps <T>{
    value: T;
    options: Array<T>;
    action: (field: T) => void;
}

export const Select = <T extends { id: number; name: string }>({
    value,
    options,
    action,
}: SelectProps<T>) => {

    const handleSelect = (id: number) => {

        const option = options.find((x) => x.id === id);
        if (option !== undefined) action(option);
    };

    return (
        <div>
            <label>
                <select
                    value={value.id}
                    onChange={(event) => {
                        handleSelect(Number(event.target.value));
                    }}
                >
                    <option  defaultValue={''} selected>
                        Выберите значение
                    </option>
                    {options.map(({ id, name }, key) => {

                        return (
                            <option key={key} value={id}>
                                {name.slice(0, 20)}
                            </option>
                        );
                    })}
                </select>
            </label>
        </div>
    );
};
