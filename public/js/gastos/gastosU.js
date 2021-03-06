var combos=id_tipo_padre=id_tipo_gastoP=caso=id_periodo = 0;
var Registrogasto = Registrogastoadicional =  RegistroPagoPropietario = TotalesMes = '' ;
var mes = []; mes[0] = '' ; mes[1] = 'ENERO'; mes[2]='FEBRERO'; mes[3]='MAYO'; mes[4] = 'ABRIL'; mes[5]='MAYO'; mes[6] = 'JUNIO'; mes[7]='JULIO'; mes[8]='AGOSTO'; mes[9]='SEPTIEMBRE'; mes[10]='OCTUBRE'; mes[11]='NOVIEMBRE'; mes[12]='DICIEMBRE';
var RegistroApartamento='';
var parametroAjax = {
    'token': $('input[name=_token]').val(),
    'tipo': 'POST',
    'data': {},
    'ruta': '',
    'async': false
};
var cargarTablaGastosConsulta  = function(data){
    $("#tablaResumenGastosMes").DataTable({
    "paging":  false,
    "ordering": false,
    "info":     false,
    "searching": false,
    "searchable":false,
    "data": data,
    "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
    "columns":[
        {"title": "Id","data": "id_pago_gcomun",visible:0},
        {"title": "Ver","data": "null", "width":"5%",
        "render": function ( data, type, full, meta ) {
         return '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>';}
        },
        {"title": "Concepto","data": "concepto_detalle"},
        {"title": "Monto","data": "monto",
        "render" : function( data, type, full ) { return formatoCentimos(data); }
        },
        {"title": "Sede","data": "id_sede",visible:0},
        {"title": "Fecha Factura","data": "fecha_factura",  "width":"10%"},
        {"title": "Fecha de Carga","data": "fecha_carga",  "width":"10%"},
        ]
    });
};

var cargarTablaGastosAdicionalesConsulta = function(data){
    $("#tablaGastosAdicionalesConsulta").dataTable({
        "paging":  false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "searchable":false,
        "data": data,
        "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "columns":[
            {"title": "Id","data": "id_pago_adicional",visible:0},
            {"title": "Concepto","data": "concepto_detalle"},
            {"title": "Propietario","data": "propietario"},
            {"title": "Fecha Carga","data": "fecha_carga"},
            {"title": "Monto","data": "monto",
            "render" : function( data, type, full ) { return formatoCentimos(data); }
            },
            {"title": "Descripcion","data": "descripcion"},
            {"title": "Sede","data": "id_sede",visible:0}
        ],
    });
};

var cargarTablaConsultaGastos = function(data){
    $("#tablaConsultaGastos").dataTable({
        "paging":  false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "data": data,
        "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "columns":[
            {"title": "Id","data": "id_gcomun",visible:0},
            {"title": "Dpto","data": "numero","width": "3%" },
            {"title": "Propietario","data": "propietario", "width": "20%"},
            {"title": " % Prtje","data": "prorretaje", "width": "5%",
            "render" : function( data, type, full ) { return formatoPorcentaje(data); }},
            {"title": "Gasto Comun","data": "monto_gcomun_apto", "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Fondo de Reserva","data": "monto_fondo_reserva",  "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Pagos Adicionales","data": "mes_pago_adicional", "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Monto Total Mes","data": "monto_total_deudas",  "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Monto Pagado","data": "monto_total_abonado",  "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Saldo deudor","data": "saldo_deudor",  "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Saldo a favor","data": "saldo_a_favor",  "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Deuda","data": "deuda",  "width": "8%",
            "render" : function( data, type, full ) { return formatoCentimos(data); }},
            {"title": "Sede","data": "id_sede",visible:0}
        ],
    });

};


var cargarResumenGastosMes = function(data){
    $("#tablaResumenGastosComunes").dataTable({
        "paging":  false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "data": data,
        "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "columns":[
            {"title": "Fecha de Facturacion", "data": "fecha_inicio"},
            {"title": "Mes de Facturación","data": "mes_inicio"},
            {"title": "Monto de Gastos Comunes","data": "gastos_comunes",
            "render" : function( data, type, full ) { return formatoCentimos(data); }
            },
            {"title": "Monto de Pagos Adicionales","data": "gastos_adicionales",
            "render" : function( data, type, full ) { return formatoCentimos(data); }
            },
            {"title": "Monto de Fondo De Reserva","data": "fondo_reserva",
            "render" : function( data, type, full ) { return formatoCentimos(data); }
            }
        ],
    });
};


function formatoCentimos(n) {
    var cadena =  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cadena = cadena.replace(',','.');
    signo = '$';
  return signo.concat(cadena);
};
function formatoPorcentaje(n) {
    var cadena =  n.concat('%');
  return cadena;
};


var cargarTablaDetalle = function(data){
    $("#TablaDetalle").dataTable({
        "paging":   false,
        "searching": false,
        "info": false,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "columnDefs": [
        {
            "targets": -1,
            "data": null,
            "searchable": false,
        }
        ],
        "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "data": data,
        "columns":[
        {"title": "Id","data": "id",visible:0},
        {"title": "Concepto(s)","data": "text"}
        ],
    });
};

var cargarTablaGastosAdicionalesConsulta = function(data){
    $("#tablaGastosAdicionalesConsulta").dataTable({
        "paging":  false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "searchable":false,
        "data": data,
         "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "columns":[
            {"title": "Id","data": "id_pago_adicional",visible:0},
            {"title": "Concepto","data": "concepto_detalle"},
            {"title": "Propietario","data": "propietario"},
            {"title": "Fecha Carga","data": "fecha_carga"},
            {"title": "Monto","data": "monto",
            "render" : function( data, type, full ) { return formatoCentimos(data); }
            },
            {"title": "Descripcion","data": "descripcion"},
            {"title": "Sede","data": "id_sede",visible:0}
        ],
    });
};

var crearallcombos = function(data){
    crearcombo('#mes',mes);
    crearcombo('#anios',data.v_anios);
    crearcombo('#id_apartamento', data.v_apartamentos_cbo);
}

var consultarPagos = function(){
    var parametros = {'mes': $("#mes").val(), 'anio':$("#anios").val(), 'id_apartamento': $("#id_apartamento").val()}
    parametroAjax.data =  {parametros:parametros};
    parametroAjax.ruta=rutaCGC;
    respuesta=procesarajax(parametroAjax);
    ManejoRespuestaConsulta(respuesta);
};

var ManejoRespuestaConsulta = function(respuesta){

      if (respuesta.code=='200'){
        limpiarTablaResumenGastosComunes();
        cargarResumenGastosMes(respuesta.respuesta.v_totales_mes);
        limpiarTablaResumenGastosMes();
        cargarTablaGastosConsulta(respuesta.respuesta.v_gastos);
        limpiarTablaPagosAdicionalesConsulta();
        cargarTablaGastosAdicionalesConsulta(respuesta.respuesta.v_gastos_adicionales);
        limpiarTablaCalculoGastosComunes();
        cargarTablaConsultaGastos(respuesta.respuesta.v_calculo_gcomunes);
        var valor = respuesta.respuesta.v_totales_mes[0].gastos_comunes;
        $("#gasto_comun").autoNumeric('init',{  aSign:'$ ', aSep: '.',aDec: ' ', mDec: false });
        $('#gasto_comun').val(valor);
        $("#gasto_comun").focus();
        $("#gasto_comun").focusout();
        $("#prorretaje").focus();
      }else{
         mensajesAlerta('Error','Comuniquese con el personal de soporte técnico', 'error');
     }
}


var visualizarGasto = function(RegistroGasto){
    if(RegistroGasto.tipo_gasto!=null){$(".tipo_gasto").text(RegistroGasto.tipo_gasto);}
    if(RegistroGasto.concepto_detalle!=null){$(".concepto_detalle").text(RegistroGasto.concepto_detalle);}
    if(RegistroGasto.descripcion!=null){$(".descripcion").text(RegistroGasto.descripcion);}
    if(RegistroGasto.fecha_factura!=null){$(".fecha_factura").text(RegistroGasto.fecha_factura);}
    if(RegistroGasto.urlimage!=null){$(".urlimage").text(RegistroGasto.urlimage);}
    if(RegistroGasto.monto!=null){$(".monto").text(RegistroGasto.monto);}
    if(RegistroGasto.fecha_carga!=null){$(".fecha_carga").text(RegistroGasto.fecha_carga);}
    if(RegistroGasto.urlimage!=null){$(".urlimage").text(RegistroGasto.urlimage);}
    $('#modalGasto').window('open');
}

var cancelarModalCargar = function(){
    $('#modalGasto').window('close');
}

var descargarImagen= function(){
  OpenWindowWithPost('/reportes/visualizar_factura.php','','_blank',Registrogasto);
}

var calcularGastoDetalle = function(){
   var prorretaje = $('#prorretaje').val();
   var gasto_comun =  $('#gasto_comun').val();
   prorretaje = prorretaje.replace(',','.');
   gasto_comun = gasto_comun.replace('$','');
   gasto_comun = gasto_comun.replace('.','');
   var calculo =( parseInt(gasto_comun) *  parseInt(prorretaje)/100);
   $(".monto_calculado").text(formatoCentimos(calculo));
}


var limpiarTablaPagosAdicionales = function(){destruirTablaS('tablaGastosAdicionales');};
var limpiarTablaPagos = function(){destruirTablaS('tablaGastos');};
var limpiarTablaCalculoGcomunes = function(){ destruirTablaS('tablaCalculoGcomunes');};
var limpiarTablaGastosComunes = function(){destruirTablaS('tablaGastosComunes');}
var limpiarTablaPagosPropietarios = function(){destruirTablaS('tablaPagosPropietarios');};
var limpiarTablaGastosComunesConsulta = function(){destruirTablaS('tablaConsultaGastos');};
var limpiarTablaResumenGastos = function(){destruirTablaS('tablaResumenGastosMes');};
var limpiarTablaResumenGastosComunes = function(){destruirTablaS('tablaResumenGastosComunes');};
var limpiarTablaResumenGastosMes = function(){destruirTablaS('tablaResumenGastosMes');};
var limpiarTablaCalculoGastosComunes = function(){destruirTablaS('tablaConsultaGastos');};
var limpiarTablaPagosAdicionalesConsulta = function(){destruirTablaS('tablaGastosAdicionalesConsulta');};
var validarConsulta=function(){$('#FormConsulta').formValidation('validate');};


$(document).ready(function(){
    $(document).on('click','#consultaPagos',validarConsulta);
    $(document).on('click','#cancelarModalGasto',cancelarModalCargar);
    $(document).on('click','#descargarImagen',descargarImagen);
    $(document).on('click','#calcularGastoDetalle',calcularGastoDetalle);
    //Modales
    cargarTablaGastosConsulta(d.v_gastos);
    cargarTablaConsultaGastos(d.v_calculo_gcomunes);
    cargarTablaGastosAdicionalesConsulta(d.v_gastos_adicionales);
    cargarResumenGastosMes(d.v_total_gastos);
    crearallcombos(d);
    //cargarTablaGastosAdicionalesConsulta(d.v_gastos_adicionales_consulta);

    var tableB = $('#tablaResumenGastosMes').dataTable();
    $('#tablaResumenGastosMes tbody').on('click', 'tr', function (e) {
        tableB.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        Registrogasto = TablaTraerCampo('tablaResumenGastosMes',this);

        visualizarGasto(Registrogasto);
    });
    tableB.on('dblclick', 'tr', function () {
        $('#close').trigger('click');
    });

    var valor = d.v_total_gastos[0].gastos_comunes;

    $('#gasto_comun').val(valor);
    $('#gasto_comun').attr("readonly","readonly")
    $("#gasto_comun").autoNumeric('init',{  aSign:'$ ', aSep: '.',aDec: ' ', mDec: false });
    $("#gasto_comun").focus();

        $('#FormConsulta').formValidation({
        // message: 'El módulo le falta un campo para ser completado',
        fields: {
            'mes': {
                verbose: false,
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                }
            },
            'anios': {
                verbose: false,
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                }
            }
        }
    })
    .on('success.form.fv', function(e){
      consultarPagos();
    })
    .on('status.field.fv', function(e, data){
        data.element.parents('.form-group').removeClass('has-success');
    });


});