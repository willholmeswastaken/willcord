import { PlusIcon } from '@heroicons/react/24/solid'
import { useSetAtom } from 'jotai';
import { createServerModalVisibleAtom } from '../../atoms';
import AddServerModal from './AddServerModal'

const AddServerItem = () => {
    const setCreateServerModalVisible = useSetAtom(createServerModalVisibleAtom);
    const showModal = () => setCreateServerModalVisible(true);

    return (
        <>
            <div className='flex flex-row justify-center items-center'>
                <div className='h-8 w-1 mt-2 mr-2 rounded-x'></div>
                <button
                    type='button'
                    className="w-12 h-12 rounded-[24px] transition-all hover:rounded-xl bg-secondary hover:bg-green-600 text-green-600 hover:text-white"
                    onClick={showModal}><PlusIcon className='w-7 h-7 m-auto' /></button>
            </div>
            <AddServerModal />
        </>
    )
}

export default AddServerItem