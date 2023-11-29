import { rem } from 'polished';

interface Options {
  trStyleList: [];
}

export const summaryHead = (summary: string[], options?: Options) => {
  return (
    <tr className={'head'}>
      {summary.map((item, index) => {
        const trStyle: any = {};

        if (
          options &&
          options.trStyleList &&
          options.trStyleList[index] !== undefined
        ) {
          trStyle['width'] = options.trStyleList[index]
        } else {
          trStyle['width'] = `${rem(100 / summary.length)}%`
        }

        return (
          <td
            key={index}
            style={trStyle}
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
