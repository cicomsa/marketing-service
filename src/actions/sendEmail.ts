export const sendEmail = async (
  action: () => Promise<boolean>,
  delayTime: number,
  userEmail: string,
): Promise<void> => {
  console.log(`Awaiting ${delayTime} miliseconds`);

  await new Promise((resolve) => setTimeout(resolve, delayTime));

  console.log(`Sending email to ${userEmail}`);

  const emailSent = await action();

  if (!emailSent) {
    console.log(`Email failed to be sent to user with email ${userEmail}`);
    return;
  }

  console.log(`Email was succesfully sent to user with email ${userEmail}`);
};
