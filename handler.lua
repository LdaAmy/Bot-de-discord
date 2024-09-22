local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local Tools = module("vrp","lib/Tools")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
src = {}
Tunnel.bindInterface("bot",src)
Proxy.addInterface("bot",src)
AddEventHandler("WebSocketServer:onMessage", function(message, endpoint)
    -- define m como a mensagem
    local m = message
    -- identificador de comando pelo o websocket
    local identifier = m:sub(1, 1)
    -- encontrar o id do personagem
    local id = m:match("(%d+)")
    local nid = parseInt(id)
    local args = m:match("%S+ %d+ (.-)$")
    local anuncio = m:match("%S+ (.-)$")
    local isSpace = function(str)
        return str:match("%s") ~= nil
    end
    -- usa um idenficador mandado pelo bot do discord para atribuir corretamente os comandos
    if identifier == "k" then
        local kickCheck = false
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        if vRP.isConnected(nid) then
        local n_id = vRP.getUserSource(parseInt(id))
        if args == nil or isSpace(args) then
            args = "Você foi expulso da cidade."
            vRP.kick(n_id, args)
            kickCheck = true
        end
        if args ~= nil and not isSpace(args) and not kickCheck then
            vRP.kick(n_id, args)
        end
       TriggerEvent("WebSocketServer:broadcast", "O usuário foi kickado com sucesso.");
    else 
        TriggerEvent("WebSocketServer:broadcast", "O usuário não está conectado.");
    end
end
    if identifier == "b" then
        local n_id = vRP.getUserSource(parseInt(id))
        vRP.kick(n_id, "Você foi banido.")
        TriggerEvent("WebSocketServer:broadcast", "Você baniu".." "..nid.." ".."com sucesso")
        end
    if identifier == "u" then
        TriggerEvent("WebSocketServer:broadcast", "Você desbaniu".." "..nid.." ".."com sucesso")
    end
    if identifier == "l" then
         if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
         local source = vRP.getUserSource(nid)
         local player = GetPlayerPed(source)
         vRP.clearInventory(nid)
         RemoveAllPedWeapons(player,true)
         TriggerEvent("WebSocketServer:broadcast", "Você limpou o inventário e as armas de".." "..nid.." ".."com sucesso")
    end
    if identifier == "a" then
        Citizen.CreateThread(function()
        vRPclient.setDiv(-1,"anuncio",".div_anuncio { background: rgba(255,50,50,0.8); font-size: 11px; font-family: arial; color: #fff; padding: 20px; bottom: 25%; right: 5%; max-width: 500px; position: absolute; -webkit-border-radius: 5px; } bold { font-size: 16px; }","<bold>"..anuncio.."</bold><br><br>Mensagem enviada por: Administrador")
        TriggerEvent("WebSocketServer:broadcast", "Anúncio enviado com sucesso.")
        Wait(60000)
        vRPclient.removeDiv(-1,"anuncio")
    end)
    end
    if identifier == "x" then
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        local n_id = vRP.getUserSource(parseInt(id))
        vRPclient.killGod(n_id)
        vRPclient.setHealth(n_id,400)
        vRP.setHunger(nid, -100)
        vRP.setThirst(nid, -100)
        TriggerEvent("WebSocketServer:broadcast", "Você deu God no ID:".." "..nid.." ".."com sucesso")
    end
    if identifier == "y" then
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        local n_id = vRP.getUserSource(parseInt(id))
        vRPclient.killGod(n_id)
        vRPclient.setHealth(n_id,0)
        TriggerEvent("WebSocketServer:broadcast", "Você matou o ID:".." "..nid.." ".."com sucesso")
    end
    if identifier == "z" then
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        vRP.giveMoney(nid,parseInt(args))
        TriggerEvent("WebSocketServer:broadcast", "Você adicionou "..args.." reais para o ID:".." "..nid.." ".."com sucesso")
    end
    if identifier == "d" then
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        vRP.tryPayment(nid,parseInt(args))
        TriggerEvent("WebSocketServer:broadcast", "Você removeu "..args.." reais para o ID:".." "..nid.." ".."com sucesso")
    end
    if identifier == "g" then
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        vRP.addUserGroup(nid,args)
        TriggerEvent("WebSocketServer:broadcast", nid.." ".."foi adicionado ao grupo".." "..args.." ".."com sucesso.");
    end
    if identifier == "p" then
        if id == nil then TriggerEvent("WebSocketServer:broadcast", "Providencie um ID.") return end;
        if vRP.isConnected(nid) then
        vRP.removeUserGroup(nid,args)
        TriggerEvent("WebSocketServer:broadcast", nid.." ".."foi removido do grupo".." "..args.." ".."com sucesso.");
        else
            TriggerEvent("WebSocketServer:broadcast", "O ID:" .." "..nid.." ".. "Não está conectado.");
        end
    end
    if identifier == "r" then
        TriggerEvent("WebSocketServer:broadcast", "O servidor está sendo reiniciado.");
      ExecuteCommand('rr')
    end
    end)


  
