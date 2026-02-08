from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime

@api_view(['GET'])
def api_moj_tekst(request):
    dane = {
        'moj_tekst': 'To jest tekst z Django API, który React wyświetli na stronie!',
        'data': datetime.now().strftime('%d.%m.%Y %H:%M:%S'),
        'autor': 'Backend Django'
    }
    
    return Response(dane)
