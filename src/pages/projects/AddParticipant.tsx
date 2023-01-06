import React, { FC, useState } from "react"
import { DynamicModal } from "../../components/lib/DynamicModal"

interface Props {
    data: any,
    show: boolean,
    projectId: any,
    showOrHideModal: any,
}

export const AddParticipant: FC<Props> = ({ data, projectId, show, showOrHideModal }) => {
    const [state, setstate] = useState({
        isPostingForm: false,
        input: {

        },
        errors: {

        }
    })

    const onFormSubmitHandler = (e: any) => {
        
    }

    return (
        <React.Fragment>
            <DynamicModal
                size={"sm"}
                show={show}
                title={"Add Participants"}
                showOrHideModal={showOrHideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                actionButton={{
                    before: "Create",
                    after: "Creating"
                }}
                formComponents={
                    <>
                    
                    </>
                }
                />
        </React.Fragment>
    )
}