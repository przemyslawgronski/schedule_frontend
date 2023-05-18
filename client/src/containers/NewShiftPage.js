import React from 'react';
import RenderSolution from '../components/RenderSolution';
import ChooseDaysOff from '../components/newShift/ChooseDaysOff';
import ChooseDate from '../components/newShift/ChooseDate';
import ChooseGroup from '../components/newShift/ChooseGroup';
import EmpsInGroup from '../components/newShift/EmpsInGroup';
import GetSolution from '../components/newShift/GetSolution';
import GenerateButton from '../components/newShift/GenerateButton';
import SaveSuccess from '../components/newShift/SaveSuccess';
import SaveButton from '../components/newShift/SaveButton';


const NewShiftPage = () => {

  // TODO: Sprawdzić czy już istnieje w shifts/<int:year>/<int:month>
  // Ale w tej samej grupie !!!!!
  // Jeśli tak to wyświetlić komunikat i zapytać co zrobić:
  // przekierować do strony z grafikiem
  // edytować grafik
  // usunąć stary i utworzyć nowy

  // TODO: Pokaż link do wszystkich zmian /shifts
  // TODO: Zakaz nadpisywania grafików (ta sama grupa, ten sam dzień), tylko modyfikacja

  // useEffect(()=>{
  //   resetSolution(); // Clear generated schedule and clear save info if something was changed
  //   resetSave();
  // },[daysOff, groupId, date, resetSave, resetSolution])

  // TODO: resetSolution chyba nie działa po zapisaniu grafiku

  return (
    <ChooseGroup>                   {/*create: GroupIdContext,      consume: */}
      <EmpsInGroup>                 {/*create: EmpsInGroupContext,  consume: GroupIdContext*/}
        <ChooseDate>                {/*create: DateContext,         consume: */}

          <SaveSuccess>             {/*create: SaveSuccessContext,  consume: */}
            <GetSolution>             {/*create: SolutionContext,     consume: */}

              <ChooseDaysOff>         {/*create: DaysOffContext,      consume: EmpsInGroupContext, DateContext, GroupIdContext*/}
                <GenerateButton />    {/*create:                      consume: SolutionContext, EmpsInGroupContext, DateContext, GroupIdContext, DaysOffContext*/}
              </ChooseDaysOff>

                <RenderSolution/>       {/*create:                      consume: EmpsInGroupContext, SolutionContext, DateContext*/}
                <SaveButton/>           {/*create:                      consume: SaveSuccessContext, DateContext, GroupIdContext, SolutionContext*/}
            
            </GetSolution>
          </SaveSuccess>

        </ChooseDate>
      </EmpsInGroup>
    </ChooseGroup>
  )
}

export default NewShiftPage