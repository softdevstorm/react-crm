import React, { Component, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setMessageId } from '../lib/store/action/filter';

const openMessageModal = (props) => {
    const [showModal, setShowModal] = useState(false);
    const {messageId, dispatch} = props;

    React.useEffect(() => {
        if (messageId) {
            setShowModal(true);
        }
    }, [messageId])

    const hideModal = () => {
        setShowModal(false);
        dispatch(setMessageId(null));
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={hideModal}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        messageId: state.filter.messageId
    }
}

export default connect(mapStateToProps)(openMessageModal)