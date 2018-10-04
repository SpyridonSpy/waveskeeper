import * as styles from './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { Balance, Button, BUTTON_TYPE } from '../ui';
import { SignClass } from './SignClass';
import { Asset, Money, BigNumber } from '@waves/data-entities';


@translate('extension')
export class Issure extends SignClass {
    
    render() {
        const { data: tx } = this.props.signData;
        const asset = {
            description: tx.description,
            name: tx.name,
            precision: tx.precision,
            quantity: new BigNumber(tx.quantity),
            reissuable: false
        } as any;
        
        const quantity = new Money(asset.quantity, new Asset(asset));
        
        return <div className={styles.transaction}>
            {super.render()}
            
            <div className={`${styles.txBalance} center headline2`}>
                <Balance split={true} showAsset={true} balance={quantity}/>
            </div>
            
            <div className={styles.txScrollBox}>
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.description'>Description</Trans>
                    </div>
                    <div className={styles.txValue}>{tx.description}</div>
                </div>
    
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.decimalPoints'>Decimal points</Trans>
                    </div>
                    <div className={styles.txValue}>{tx.precision}</div>
                </div>
                
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.issureType'>Type</Trans>
                    </div>
                    <div className={styles.txValue}>{
                        tx.reissuable ?
                            <Trans i18nKey='transactions.reissuable'>Reissuable</Trans>:
                            <Trans i18nKey='transactions.noReissuable'>No reissuable</Trans>
                    }</div>
                </div>
                
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.txid'>TXID</Trans>
                    </div>
                    <div className={styles.txValue}>{this.state.txId}</div>
                </div>
                
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.fee'>Fee</Trans>
                    </div>
                    <div className={styles.txValue}><Balance isShortFormat={true} balance={tx.fee} showAsset={true}/></div>
                </div>
            </div>
            
            <div className={`${styles.txButtonsWrapper} buttons-wrapper`}>
                <Button onClick={this.rejectHandler} type={BUTTON_TYPE.WARNING}>
                    <Trans i18nKey='sign.reject'>Reject</Trans>
                </Button>
                <Button onClick={this.approveHandler} type={BUTTON_TYPE.SUBMIT}>
                    <Trans i18nKey='sign.approve'>Approve</Trans>
                </Button>
            </div>
        </div>
    }
}
