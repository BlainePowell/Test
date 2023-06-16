import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Theme } from "../../../theme";
import TransactionSuccess from "./TransactionSuccess";
import TransactionFailed from "./TransactionFailed";

interface AfterTransactionProps {
    swapTheme: Theme;
    isSwapSuccess: boolean;
    isSwapFinished: boolean;
    setSwapActive: (value: boolean) => void;
    setIsApproved: (value: boolean) => void;
    setIsBufferAccepted: (value: boolean) => void;
    setIsSwapFinished: (value: boolean) => void;
    outgoingFlowRate: number;
    endDate: string;
    setSwapAmount: (value: number) => void;
}

const AfterTransaction = ({
    swapTheme,
    isSwapFinished,
    isSwapSuccess,
    setSwapActive,
    setIsApproved,
    setIsBufferAccepted,
    setIsSwapFinished,
    outgoingFlowRate,
    setSwapAmount
}: AfterTransactionProps) => {
    const [isExitHover, setIsExitHover] = useState(false);

    return (
        <div
            className={`absolute bottom-[0.2rem] left-0 right-0 z-50 bg-black transition-all rounded-[2rem] duration-300 overflow-hidden ${isSwapFinished
                ? "top-0 pointer-events-auto"
                : "top-full pointer-events-none"
                }`}
        >
            <div className={`${isSwapFinished ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-center ease-in-out duration-300 rounded-[2rem] px-4`}>
                <div className="w-full flex flex-row items-center justify-end px-3 font-bold text-2xl text-white">
                    <IoMdClose className="text-3xl mt-3 cursor-pointer ease-in-out duration-100"
                        onMouseEnter={() => {
                            setIsExitHover(true)
                        }}
                        onMouseLeave={() => {
                            setIsExitHover(false)
                        }}
                        style={{ color: isExitHover ? swapTheme.accentText : swapTheme.primaryText }}
                        onClick={() => {
                            setSwapActive(false)
                            setIsBufferAccepted(false)
                            setIsApproved(false)
                            setIsSwapFinished(false)
                            setSwapAmount(0)
                        }}
                    />
                </div>
                {isSwapSuccess ? (
                    <TransactionSuccess
                        swapTheme={swapTheme}
                        outgoingFlowRate={outgoingFlowRate}
                    />
                ) : (
                    <TransactionFailed
                        swapTheme={swapTheme}
                        setSwapActive={setSwapActive}
                        setIsApproved={setIsApproved}
                        setIsBufferAccepted={setIsBufferAccepted}
                        setIsSwapFinished={setIsSwapFinished}
                    />
                )}
            </div>
        </div>
    )
}

export default AfterTransaction;