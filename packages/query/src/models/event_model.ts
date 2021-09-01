type Dict = { [key: string]: any };

interface EventModel {
    type: string;
    data: Dict;
}

export {Dict, EventModel};
