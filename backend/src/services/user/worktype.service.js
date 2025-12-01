import { getAllWorkType } from "../../repositories/worktype.repository";

const handleGetAllWorkType = async () => {
    return await getAllWorkType();
}

export { handleGetAllWorkType };