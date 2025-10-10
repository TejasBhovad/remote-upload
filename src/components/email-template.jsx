import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const FilesEmail = ({
  brandName = "remoteUpload",
  username = "default",
  userImage = `${baseUrl}/favicon.png`,
  ghLink = "https://github.com/TejasBhovad/remote-upload",
}) => {
  const previewText = `${username} thank you for using ${brandName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://remoteupload.vercel.app/favicon.png"
                width="40"
                height="37"
                alt="remoteUpload"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Thank you for using <strong>{brandName}</strong>
            </Heading>
            <Section>
              <Row>
                <Column align="center">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Find the files you needed attached to this email. If you have any
              questions, please contact us at {""}
              <Link href="https://tejasbhovad.com">our Contact page</Link>
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={ghLink}
              >
                Star the project
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FilesEmail;
