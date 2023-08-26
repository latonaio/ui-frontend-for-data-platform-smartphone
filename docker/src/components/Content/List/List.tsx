
export const summaryHead = (summary: string[]) => {
  return (
    <tr className={'head'}>
      {summary.map((item, index) => {
        return (
          <td
            key={index}
            style={{
              width: `${100 / summary.length}%`
            }}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        );
      })}
    </tr>
  );
}

export const clickHandler = async (link: string, router: any) => {
  await router.push(link);
};
