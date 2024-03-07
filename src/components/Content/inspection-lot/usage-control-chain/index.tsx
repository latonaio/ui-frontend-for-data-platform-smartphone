import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContent,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
  ProductDetailSectionContentQRCodeBox,
  ProductDetailSectionContentQRCodeBoxWrapper,
  ProductDetailSectionContentProductMenuListWrapper,
  UsageControlListBox,
} from '@/components/Content/Detail/Detail.style';
import {
  InspectionLotTablesEnum,
  InspectionLotUsageControlChainProps, ProductionOrderTablesEnum,
} from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateImageProductUrl, generateQRCodeImageUrl, getLocalStorage } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { Carousel } from '@/components/Carousel';
import { useRouter } from 'next/router';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { Checkbox, QuantityPostCancelButton } from '@/components/Button';

export const InspectionLotUsageControlChain = ({
                                                 className,
                                                 isUsageControlOpenFlag,
                                                 setIsUsageControlOpenFlag,
                                        }: {
  className?: string;
  isUsageControlOpenFlag?: boolean;
  setIsUsageControlOpenFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.inspectionLotUsageControlChain) as {
    [InspectionLotTablesEnum.inspectionLotUsageControlChain]: InspectionLotUsageControlChainProps,
  };

  if (!detail[InspectionLotTablesEnum.inspectionLotUsageControlChain]) { return <div></div> }

  const router = useRouter();

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <ProductDetailSectionContentTwoColumn
          style={{
            marginBottom: rem(10)
          }}
        >
          <div
            className={'column-left'}
            style={{
              width: `30%`
            }}
          >
            <img
              src={
                detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].Images?.Product?.BusinessPartnerID.toString(),
                  detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].Images?.Product,
                ) || ''}
              alt={``}
              style={{
                maxWidth: `120%`,
                marginLeft: `-12px`,
              }}
            />
          </div>
          <div
            className={'column-right lightBlueInfo'}
            style={{
              paddingLeft: rem(10),
              width: `70%`
            }}
          >
            <div>
              <span className={'itemName'}>証明対象: </span>
              <span className={'itemText'}>
                {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].CertificateObject}
              </span>
            </div>
            <div>
              <span className={'itemName'}>証明対象ラベル: </span>
              <span className={'itemText'}>
                {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].CertificateObjectLabel}
              </span>
            </div>
            <div>
              <span className={'itemName'}>発行者: </span>
              <span
                className={'itemText'}
              >
                {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].DataIssuerName}
              </span>
            </div>
            <div>
              <span className={'itemName'}>証明者: </span>
              <span
                className={'itemText'}
              >
                {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].DataAuthorizerName}
              </span>
            </div>
            <div>
              <span className={'itemName'}>Distributor: </span>
              <span className={'itemText'}>
                {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].DataDistributorName}
              </span>
            </div>
            <div>
              <span className={'itemName'}>Timestamp: </span>
              <span className={'itemText'}>
                {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].CreationDate} / {detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].CreationTime}
              </span>
            </div>
          </div>
        </ProductDetailSectionContentTwoColumn>
        <ProductDetailSectionContentTwoColumn
          style={{
            marginBottom: rem(10)
          }}
        >
          <div
            className={'column-left'}
            style={{
              width: `50%`,
            }}
          >
            <div className={'productMenu'}>
              <div>
                <PublicImage
                  className={'m-auto'}
                  imageName={'underConstruction'}
                  width={70}
                />
              </div>
              <div className={'productMenuTitle text-center'}>Under<br />Construction…</div>
            </div>
          </div>
          <div
            className={'column-right'}
            style={{
              width: `50%`,
            }}
          >
            <div className={'productMenu'}>
              <div>
                <PublicImage
                  className={'m-auto'}
                  imageName={'underConstruction'}
                  width={70}
                />
              </div>
              <div className={'productMenuTitle text-center'}>Under<br />Construction…</div>
            </div>
          </div>
        </ProductDetailSectionContentTwoColumn>
      </ProductDetailSection>

      <ProductDetailSection
        style={{
          marginBottom: rem(20),
        }}
      >
        <ProductDetailSectionInfo>
          <ProductDetailSectionHeader>
            <div>
              Usage Control
            </div>
          </ProductDetailSectionHeader>
        </ProductDetailSectionInfo>
      </ProductDetailSection>

      <ProductDetailSection className={'m-0'}>
        <Carousel>
          {/* scroll 1 */}
          <div
            style={{
              backgroundColor: `#eeeeee`,
            }}
            onClick={() => {
              setIsUsageControlOpenFlag && setIsUsageControlOpenFlag(!isUsageControlOpenFlag);
            }}
          >
            <ProductDetailSectionContentTwoColumn
              className={'items-start justify-start'}
              style={{
                fontSize: rem(14),
                marginBottom: rem(10),
              }}
            >
              <div
                className={'column-left text-center'}
                style={{
                  width: `50%`,
                  padding: `${rem(20)} ${rem(5)} ${rem(0)} ${rem(60)}`,
                }}
              >
                <UsageControlListBox>
                  <div className={`UsageControlListBoxCover red ${isUsageControlOpenFlag ? '' : 'hidden'}`}>
                    <div className={'flex items-start justify-start'}>
                      <div>/Perpetual:</div>
                      <div style={{ marginLeft: `${rem(3)}`}}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].Perpetual}
                        />
                      </div>
                    </div>
                    <div className={'flex items-start justify-start'}>
                      <div>/Rental:</div>
                      <div style={{ marginLeft: `${rem(3)}` }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].Rental}
                        />
                      </div>
                    </div>
                    <div>/Duration:</div>
                    <div>/ValidityDate,Time:</div>
                  </div>
                  <div>
                    <div
                      style={{
                        marginBottom: `${rem(10)}`,
                      }}
                    >
                      <PublicImage
                        className={'m-auto'}
                        imageName={'usageControlDurations'}
                      />
                    </div>
                    <div>Durations</div>
                  </div>
                </UsageControlListBox>
              </div>
              <div
                className={'column-left text-center'}
                style={{
                  width: `50%`,
                  padding: `${rem(20)} ${rem(60)} ${rem(0)} ${rem(5)}`,
                }}
              >
                <UsageControlListBox>
                  <div className={`UsageControlListBoxCover yellow ${isUsageControlOpenFlag ? '' : 'hidden'}`}>
                    <div>/ServiceLabel: Orders, DeliveryDocument</div>
                    <div>/Application: Logistics</div>
                    <div>/BPRole: MANUFACTURER, TRADER, CONSUMER</div>
                    <div>/Location:</div>
                  </div>
                  <div>
                    <div>
                      <PublicImage
                        className={'m-auto'}
                        imageName={'usageControlRestrictions'}
                      />
                    </div>
                    <div>Restrictions</div>
                  </div>
                </UsageControlListBox>

              </div>
            </ProductDetailSectionContentTwoColumn>
            <ProductDetailSectionContentThreeColumn
              className={'items-start justify-start'}
              style={{
                fontSize: rem(12),
              }}
            >
              <div
                className={'column-left text-center'}
                style={{
                  width: `33%`,
                  margin: `${rem(0)} ${rem(5)} ${rem(20)} ${rem(40)}`,
                }}
              >
                <UsageControlListBox>
                  <div className={`UsageControlListBoxCover type-mini blue ${isUsageControlOpenFlag ? '' : 'hidden'}`}>
                    <div>/DataSate:</div>
                    <div>/NumberOfUsage:</div>
                    <div>/IPAddress:</div>
                    <div>/MACAddress:</div>
                  </div>
                  <div>
                    <div>
                      <PublicImage
                        className={'m-auto'}
                        imageName={'usageControlAccessControl'}
                      />
                    </div>
                    <div>Access<br />Controls</div>
                  </div>
                </UsageControlListBox>

              </div>
              <div
                className={'column-left text-center'}
                style={{
                  width: `33%`,
                  margin: `${rem(0)} ${rem(5)} ${rem(20)} ${rem(5)}`,
                }}
              >
                <UsageControlListBox>
                  <div className={`UsageControlListBoxCover type-mini green ${isUsageControlOpenFlag ? '' : 'hidden'}`}>
                    <div className={'flex items-start justify-start'}>
                      <div style={{ marginLeft: `${rem(3)}` }}>/LocalLogging:</div>
                      <div style={{ wordWrap: 'break-word' }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].LocalLoggingIsAllowed}
                        />
                      </div>
                    </div>
                    <div className={'flex items-start justify-start'}>
                      <div>/RemoteNotice:</div>
                      <div style={{ marginLeft: `${rem(3)}` }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].RemoteNotificationIsAllowed}
                        />
                      </div>
                    </div>
                    <div className={'flex items-center justify-start'}>
                      <div className={'break-all'}>/DistributionOnlyIfEncrypted:</div>
                      <div style={{ marginLeft: `${rem(3)}` }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].DistributeOnlyIfEncrypted}
                        />
                      </div>
                    </div>
                    <div className={'flex items-center justify-start'}>
                      <div className={'break-all'}>/AttachPolicyWhenDistribute:</div>
                      <div style={{ marginLeft: `${rem(3)}` }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].AttachPolicyWhenDistribute}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        marginBottom: `${rem(10)}`,
                      }}
                    >
                      <PublicImage
                        className={'m-auto'}
                        imageName={'usageControlDistributions'}
                      />
                    </div>
                    <div>Distri<br />butions</div>
                  </div>
                </UsageControlListBox>

              </div>
              <div
                className={'column-left text-center'}
                style={{
                  width: `33%`,
                  margin: `${rem(0)} ${rem(40)} ${rem(20)} ${rem(5)}`,
                }}
              >
                <UsageControlListBox>
                  <div className={`UsageControlListBoxCover type-mini gray ${isUsageControlOpenFlag ? '' : 'hidden'}`}>
                    <div>/UsageControlLess:</div>
                    <div className={'flex items-center justify-start'}>
                      <div className={'break-all'}>/DeleteAfterValidityEnd:</div>
                      <div style={{ marginLeft: `${rem(3)}` }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].DeleteAfterValidityEnd}
                        />
                      </div>
                    </div>
                    <div className={'flex items-center justify-start'}>
                      <div className={'break-all'}>/ModifyIsAllowed:</div>
                      <div style={{ marginLeft: `${rem(3)}` }}>
                        <Checkbox
                          className={'usageControl'}
                          isChecked={detail[InspectionLotTablesEnum.inspectionLotUsageControlChain].ModifyIsAllowed}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                  <div>
                      <PublicImage
                        className={'m-auto'}
                        imageName={'usageControlOthers'}
                      />
                    </div>
                    <div>Others</div>
                  </div>
                </UsageControlListBox>
              </div>
            </ProductDetailSectionContentThreeColumn>
          </div>


        </Carousel>
      </ProductDetailSection>

      <ProductDetailSection className={'m-0 pt-2 pb-2 relative'}>
        <div
          style={{
            width: `100%`,
            height: `100%`,
            position: `absolute`,
            textAlign: `center`,
            color: `#fff`,
            backgroundColor: `rgba(0, 0, 0, 0.5)`,
            fontSize: rem(20),
            top: `0`,
            left: `0`,
          }}
        >
          Under Designing…
        </div>
        <ProductDetailSectionContentTwoColumn>
          <div
            className={'text-center'}
            style={{
              width: `50%`
            }}
          >
            <QuantityPostCancelButton
              onClick={() => {
              }}
            >Post</QuantityPostCancelButton>
          </div>
          <div
            className={'text-center'}
            style={{
              width: `50%`
            }}
          >
            <QuantityPostCancelButton className={'cancel'}>Cancel</QuantityPostCancelButton>
          </div>
        </ProductDetailSectionContentTwoColumn>
      </ProductDetailSection>
    </Detail>
  );
};
