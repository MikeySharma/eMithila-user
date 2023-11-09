import { Modal } from 'antd';

const CustomModal = props => {

	const {title, open, hideModal, performAction} = props
	return (
		<div>
		 <Modal
		 title="Confirmation"
		    open={open}
	        onOk={performAction}
	        onCancel={hideModal}
	        okText="Ok"
	        cancelText="Cancel"
     	 >
        <p>{title}</p>
      </Modal>
			
		</div>
	)
}


export default CustomModal