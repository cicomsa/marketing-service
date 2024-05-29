export const sendEmail = async (
  action: () => Promise<boolean>,
  delayTime: number,
  userEmail: string,
): Promise<void> => {
  console.log(`awaiting ${delayTime} miliseconds`);

  await new Promise((resolve) => setTimeout(resolve, delayTime));

  console.log(`sending email to ${userEmail}`);

  const emailSent = await action();

  if (!emailSent) {
    console.log(`email failed to be sent to user with email ${userEmail}`);
    return;
  }

  console.log(`email was succesfully sent to user with email ${userEmail}`);
};
