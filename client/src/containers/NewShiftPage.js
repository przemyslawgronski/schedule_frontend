import React from 'react';
import RenderSolution from '../components/RenderSolution';
import ChooseDaysOff from '../components/newShift/ChooseDaysOff';
import ChooseDate from '../components/newShift/ChooseDate';
import ChooseGroup from '../components/newShift/ChooseGroup';
import EmpsInGroup from '../components/newShift/EmpsInGroup';
import GetSolution from '../components/newShift/GetSolution';
import SaveSuccess from '../components/newShift/SaveSuccess';
import SaveButton from '../components/newShift/SaveButton';


const NewShiftPage = () => {

  // TODO: Sprawdzić czy już istnieje w shifts/<int:year>/<int:month>
  // Ale w tej samej grupie !!!!!
  // Jeśli tak to wyświetlić komunikat i zapytać co zrobić:
  // przekierować do strony z grafikiem
  // edytować grafik
  // usunąć stary i utworzyć nowy

  // TODO: Zakaz nadpisywania grafików (ta sama grupa, ten sam dzień), tylko modyfikacja

  return (
    <ChooseGroup>                   {/*create: GroupIdContext,      consume: */}
      <ChooseDate>                {/*create: DateContext,         consume: GroupIdContext*/}
        <EmpsInGroup>                 {/*create: EmpsInGroupContext,  consume: GroupIdContext*/}

            <SaveSuccess>             {/*create: SaveSuccessContext,  consume: */}
              <GetSolution>             {/*create: SolutionContext,     consume: DateContext, GroupIdContext */}

                <ChooseDaysOff/>         {/*create: DaysOffContext,      consume: EmpsInGroupContext, DateContext, SolutionContext*/}
                  {/* <GenerateButton/>    create:                      consume: GroupIdContext, SolutionContext */}
                <RenderSolution/>       {/*create:                      consume: EmpsInGroupContext, SolutionContext, DateContext*/}
                <SaveButton/>           {/*create:                      consume: SaveSuccessContext, DateContext, GroupIdContext, SolutionContext*/}
              
              </GetSolution>
            </SaveSuccess>

        </EmpsInGroup>
      </ChooseDate>
    </ChooseGroup>
  )
}

export default NewShiftPage